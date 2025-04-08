import {
    type SubscriberConfig,
    type SubscriberArgs,
  } from "@medusajs/framework"
  // *** INTENTO: Importar directamente el workflow correcto ***
  // Nota: 'Customers' (plural) y 'Group' (singular)
  import { linkCustomersToCustomerGroupWorkflow } from "@medusajs/medusa/core-flows"
  
  // ID del grupo de clientes "Sin Órdenes"
  const SIN_ORDENES_GROUP_ID = "cusgroup_01JR9P1PG156BRDRCJSHKXGA66"
  
  // Interfaz del Input esperada por este workflow (basada en la API y objetivo)
  interface LinkCustomersInput {
    id: string; // ID del Grupo de Clientes
    add?: string[]; // IDs de Clientes a añadir
    remove?: string[]; // IDs de Clientes a quitar
  }
  
  
  export default async function customerCreatedHandler({
    event: { data }, // data contiene { id: customer_id }
    container,
  }: SubscriberArgs<{ id: string }>) {
    console.log('🟢 EVENTO DETECTADO: customer.created - Nuevo cliente registrado')
    console.log('📋 ID del cliente:', data.id)
    console.log(`🎯 Objetivo: Añadir cliente ${data.id} al grupo ${SIN_ORDENES_GROUP_ID}`)
  
    try {
      // Prepara el input para el workflow 'linkCustomersToCustomerGroupWorkflow'
      const workflowInput: LinkCustomersInput = {
        id: SIN_ORDENES_GROUP_ID, // ID del Grupo
        add: [data.id],           // ID del Cliente a añadir
      }
  
      console.log(`⏳ Ejecutando workflow importado "linkCustomersToCustomerGroupWorkflow"...`)
      console.log('📨 Input del workflow:', JSON.stringify(workflowInput, null, 2))
  
      // *** Invocar el workflow importado directamente ***
      const { result, errors } = await linkCustomersToCustomerGroupWorkflow(container).run({
        input: workflowInput,
        // transactionId: `add-customer-${data.id}-to-group-${SIN_ORDENES_GROUP_ID}` // Opcional
      })
  
      if (errors && errors.length > 0) {
         console.error(`❌ Errores durante la ejecución del workflow "linkCustomersToCustomerGroupWorkflow":`, errors);
         // Lanza el primer error para que sea capturado por el catch general
         throw errors[0].error || new Error(errors[0].message || 'Error desconocido en workflow');
      }
  
      console.log(`✅ Cliente ${data.id} añadido exitosamente al grupo Sin Órdenes (${SIN_ORDENES_GROUP_ID}) mediante workflow importado.`)
      console.log('📊 Resultado del workflow:', result) // Opcional: loguear el resultado si es útil
  
    } catch (error) {
      console.error(`❌ ERROR al añadir cliente ${data.id} al grupo ${SIN_ORDENES_GROUP_ID} usando workflow importado:`, error)
  
      // Verifica si el error es porque el workflow no se pudo importar
      if (error instanceof TypeError && error.message.includes("is not a function")) {
          console.error(`❌ ERROR DE IMPORTACIÓN: Asegúrate de que "linkCustomersToCustomerGroupWorkflow" se puede importar desde "@medusajs/medusa/core-flows" en tu versión.`);
      } else if (error instanceof Error) {
          console.error('Detalles del error:', error.message);
          console.error('Stack trace:', error.stack);
      } else {
          console.error('Detalles del error (no es instancia de Error):', error);
      }
      // throw error; // Decide si quieres que el error detenga otros procesos
    }
  }
  
  export const config: SubscriberConfig = {
    event: "customer.created", // Evento correcto para tu objetivo
    // subscriberId: "customer-created-add-to-group-handler" // Opcional
  }