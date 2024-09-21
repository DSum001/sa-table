package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/DSum001/sa-table/config"
	"github.com/DSum001/sa-table/controller/booking"
	"github.com/DSum001/sa-table/controller/booking_soups"
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
	// Initialize database
	config.ConnectionDB()
	config.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	// Public routes
	r.POST("/signup", employee.SignUp)
	r.POST("/signin", employee.SignIn)

	// Group protected routes
	router := r.Group("/")
	{
		router.Use(middlewares.Authorizes())
		// Employee
		router.PATCH("/employee/:id", employee.Update)
		router.GET("/employee", employee.GetAll)
		router.GET("/employee/:id", employee.Get)
		router.DELETE("/employee/:id", employee.Delete)

		// Booking
		r.GET("/booking", booking.GetAll)
		r.GET("/booking/:id", booking.GetByID)
		r.POST("/booking", booking.CreateBooking)
		r.PATCH("/booking/:id", booking.UpdateBooking)
		r.DELETE("/booking/:id", booking.DeleteBooking)

		// Booking Soups
		r.POST("/booking_soups", booking_soups.CreateBookingSoup)
		r.PUT("/booking_soups/:id", booking_soups.UpdateBookingSoups)

		// Other routes
		r.GET("/tables", tables.GetAll)
		r.PATCH("/tables/:id", tables.UpdateStatus)
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

// CORSMiddleware enables CORS
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
