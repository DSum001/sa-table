package main

import (

	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/DSum001/sa-table/config"
	"github.com/DSum001/sa-table/controller/booking"
	"github.com/DSum001/sa-table/controller/employee"
	"github.com/DSum001/sa-table/controller/genders"
	"github.com/DSum001/sa-table/controller/soups"
	"github.com/DSum001/sa-table/controller/packages"
	"github.com/DSum001/sa-table/controller/tables"
	"github.com/DSum001/sa-table/controller/table_status"
	"github.com/DSum001/sa-table/middlewares"
	
)

const PORT = "8000"

func main() {

	// open connection database
	config.ConnectionDB()

	// Generate databases
	config.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	r.POST("/signup", employee.SignUp)
	r.POST("/signin", employee.SignIn)

	router := r.Group("/")
	{

		router.Use(middlewares.Authorizes())

        // User Route

		router.PUT("/employee/:id", employee.Update)
		router.GET("/employee", employee.GetAll)
		router.GET("/employee/:id", employee.Get)
		router.DELETE("/employee/:id", employee.Delete)

		
		r.GET("/booking", booking.GetAll)
    	r.POST("/booking", booking.CreateBooking)
		r.GET("/genders", genders.GetGenders)
		r.GET("/tables", tables.GetTables)
		r.GET("/table_status", table_status.GetTableStatus)
		r.GET("/soups", soups.GetSoups)
		r.GET("/packages", packages.GetPackages)
		
	}

	r.GET("/", func(c *gin.Context) {

		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)

	})

	// Run the server

	r.Run("localhost:" + PORT)

}

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