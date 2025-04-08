import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
// Importamos el workflow que maneja la relación cliente <-> grupo
import { linkCustomersToCustomerGroupWorkflow } from "@medusajs/medusa/core-flows" // Asegúrate que la importación sea correcta para tu versión

// ID del grupo de clientes "Sin Órdenes"
const SIN_ORDENES_GROUP_ID = "cusgroup_01JR9P1PG156BRDRCJSHKXGA66" // Verifica que este ID sea correcto

// Interfaces para mejorar el tipado
interface OrderData {
  id: string;
  customer_id?: string; // El ID del cliente puede estar aquí directamente
  customer?: {           // O anidado dentro del objeto customer
    id: string;
  };
  metadata?: Record<string, any>;
}

// Interfaz del Input esperada por linkCustomersToCustomerGroupWorkflow
interface LinkCustomersInput {
  id: string;       // ID del Grupo de Clientes
  add?: string[];    // IDs de Clientes a añadir
  remove?: string[]; // IDs de Clientes a quitar
}

// Cambia el nombre si prefieres 'orderCompletedHandler'
export default async function orderPlacedRemoveFromNoOrdersGroupHandler({
  event: { data }, // data probablemente solo contiene { id: order_id }
  container,
}: SubscriberArgs<{ id: string }>) {
  console.log('🟢 EVENTO DETECTADO: order.placed - Orden realizada/completada')
  console.log('📋 ID de la orden:', data.id)

  let customerId: string | null = null;

  try {
    // --- Paso 1: Obtener el ID del Cliente ---
    // Es necesario recuperar la orden completa para obtener el customer_id
    console.log('⏳ Obteniendo orderService...')
    // Usamos 'any' temporalmente si hay problemas de tipos complejos con el servicio
    const orderService = container.resolve("orderService") as any
    console.log('✅ orderService obtenido correctamente')

    console.log(`⏳ Recuperando detalles de la orden ${data.id} para obtener customer_id...`)
    // Pedimos explícitamente la relación 'customer' por si acaso
    const order = await orderService.retrieve(data.id, {
        relations: ["customer"]
    }) as OrderData;
    console.log('✅ Detalles de la orden recuperados')

    // Extraer el ID del cliente de forma segura
    if (typeof order.customer_id === 'string' && order.customer_id) {
      customerId = order.customer_id
    } else if (order.customer && typeof order.customer.id === 'string' && order.customer.id) {
      customerId = order.customer.id
    }
    console.log('📋 Customer ID encontrado:', customerId)

    // --- Paso 2: Usar el Workflow para quitar al cliente del grupo ---
    if (customerId) {
      // Prepara el input para el workflow
      const workflowInput: LinkCustomersInput = {
        id: SIN_ORDENES_GROUP_ID, // ID del Grupo
        remove: [customerId],     // ID del Cliente a quitar
      }

      console.log(`⏳ Ejecutando workflow "linkCustomersToCustomerGroupWorkflow" para quitar cliente ${customerId} del grupo ${SIN_ORDENES_GROUP_ID}...`)
      console.log('📨 Input del workflow:', JSON.stringify(workflowInput, null, 2))

      // Invocar el workflow importado directamente
      const { errors } = await linkCustomersToCustomerGroupWorkflow(container).run({
        input: workflowInput,
        // Opcional: para idempotencia si es necesario
        // transactionId: `remove-customer-${customerId}-from-group-${SIN_ORDENES_GROUP_ID}-${data.id}`
      })

      // Manejo de errores del workflow
      if (errors && errors.length > 0) {
        console.error(`❌ Errores durante la ejecución del workflow "linkCustomersToCustomerGroupWorkflow":`, errors);
        // Lanza el primer error para que sea capturado por el catch general
        // Puedes inspeccionar 'errors' para más detalles si es necesario
        throw errors[0].error || new Error(errors[0].message || 'Error desconocido en workflow');
      }

      console.log(`✅ Cliente ${customerId} eliminado exitosamente del grupo Sin Órdenes (${SIN_ORDENES_GROUP_ID}) mediante workflow.`)

    } else {
      // Advertencia si no se encontró el ID del cliente en la orden recuperada
      console.warn(`⚠️ ADVERTENCIA: No se pudo encontrar un customer_id válido en la orden ${data.id}. No se realizó ninguna acción sobre grupos.`);
    }
  } catch (error) {
    // Manejo general de errores del handler
    console.error(`❌ ERROR procesando la orden ${data.id} en el handler orderPlacedRemoveFromNoOrdersGroupHandler:`, error)
    if (error instanceof Error) {
        // Ayuda a diagnosticar si el problema es con el workflow en sí
        if (error.message.includes("linkCustomersToCustomerGroupWorkflow") || (error.cause && String(error.cause).includes("linkCustomersToCustomerGroupWorkflow"))) {
             console.error(`❌ ERROR CON WORKFLOW: Revisa si "linkCustomersToCustomerGroupWorkflow" se puede importar y ejecutar correctamente desde "@medusajs/medusa/core-flows" en tu versión.`);
        }
        console.error('Mensaje de error:', error.message);
        // El stack trace es muy útil para depurar
        console.error('Stack trace:', error.stack);
    } else {
        // Para errores que no son instancias de Error
        console.error('Error desconocido:', String(error));
    }
    // Decide si el error debe detener otros posibles suscriptores o procesos.
    // Generalmente es mejor no re-lanzar (throw) aquí para no bloquear otras operaciones,
    // a menos que sea un error crítico.
    // throw error;
  }
}

// Configuración del Subscriber
export const config: SubscriberConfig = {
  // Evento que dispara este handler
  event: "order.placed", // Revisa si 'order.completed' u otro evento se ajusta mejor a tu lógica de negocio
  // Opcional: ID único para reintentos y trazabilidad
}