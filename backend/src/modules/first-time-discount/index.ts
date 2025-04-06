import { Router } from "express"
import { CustomerService, DiscountService, RegionService } from "@medusajs/medusa"
import { randomBytes } from "crypto"
import cors from "cors"

export default (router: Router) => {
  const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:8000",
    credentials: true,
  }

  router.options("/store/create-first-time-discount", cors(corsOptions))
  
  router.post("/store/create-first-time-discount", cors(corsOptions), async (req, res) => {
    const { customer_id } = req.body

    if (!customer_id) {
      return res.status(400).json({ 
        success: false, 
        message: "customer_id is required" 
      })
    }

    try {
      const customerService: CustomerService = req.scope.resolve("customerService")
      const discountService: DiscountService = req.scope.resolve("discountService")
      const regionService: RegionService = req.scope.resolve("regionService")

      // Verify customer exists
      const customer = await customerService.retrieve(customer_id)
      if (!customer) {
        return res.status(404).json({ 
          success: false, 
          message: "Customer not found" 
        })
      }

      // Check if this is a new customer
      const orders = await customerService.listOrders(customer_id)
      if (orders && orders.length > 0) {
        return res.status(400).json({ 
          success: false, 
          message: "Discount only available for first purchases" 
        })
      }

      // Get all regions to apply the discount to
      const regions = await regionService.list({})
      const regionIds = regions.map(r => r.id)

      // Generate unique discount code including part of the customer_id
      const uniqueCode = `FIRST_${customer_id.substring(0, 8)}_${randomBytes(4).toString("hex").toUpperCase()}`
      
      // Create the discount
      const discount = await discountService.create({
        code: uniqueCode,
        regions: regionIds,
        rule: {
          type: "percentage",
          value: 10,
          allocation: "total",
        },
        usage_limit: 1,
        is_disabled: false,
      })

      return res.status(200).json({ 
        success: true, 
        discount: {
          id: discount.id,
          code: discount.code,
        } 
      })
    } catch (error) {
      console.error("Error creating first-time discount:", error)
      return res.status(500).json({ 
        success: false, 
        message: "An error occurred while creating the discount" 
      })
    }
  })

  return router
} 