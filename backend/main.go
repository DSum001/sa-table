package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/DSum001/sa-table/config"
	"github.com/DSum001/sa-table/controller/booking"
	"github.com/DSum001/sa-table/controller/employee"
	"github.com/DSum001/sa-table/controller/soups"
	"github.com/DSum001/sa-table/controller/packages"
	"github.com/DSum001/sa-table/controller/tables"
	"github.com/DSum001/sa-table/controller/table_capacity"
	"github.com/DSum001/sa-table/controller/table_status"
	"github.com/DSum001/sa-table/middlewares"
)

const PORT = "8000"

func main() {

	// เปิดการเชื่อมต่อกับฐานข้อมูล
	config.ConnectionDB()

	// สร้างฐานข้อมูล
	config.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	r.POST("/signup", employee.SignUp)
	r.POST("/signin", employee.SignIn)

	// Group protected routes
	router := r.Group("/")
	{
		router.Use(middlewares.Authorizes())

		// Employee routes
		router.PATCH("/employee/:id", employee.Update)
		router.GET("/employee", employee.GetAll)
		router.GET("/employee/:id", employee.Get)
		router.DELETE("/employee/:id", employee.Delete)

		// Booking routes
		r.GET("/booking", booking.GetAll)        // ดึงข้อมูล booking ทั้งหมด
		r.GET("/booking/:id", booking.Get) // ดึงข้อมูล booking ตาม ID
		r.POST("/booking", booking.Create)    // สร้าง booking ใหม่
		r.PATCH("/booking/:id", booking.Update) // อัพเดท booking
		r.DELETE("/booking/:id", booking.Delete) // ลบ booking ตาม ID

		// Genders, Tables, and other routes
		r.GET("/tables", tables.GetAll)
		r.GET("/table_capacity", table_capacity.GetAll)
		r.GET("/table_status", table_status.GetAll)
		r.GET("/soups", soups.GetAll)
		r.GET("/packages", packages.GetAll)
	}

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})

	// Run the server
	r.Run("localhost:" + PORT)
}

// CORSMiddleware เปิดการใช้งาน CORS
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
