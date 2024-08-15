package main

import (

	"net/http"
    "github.com/gin-gonic/gin"
    "github.com/DSum001/sa-table/config"
    "github.com/DSum001/sa-table/controller/genders"
    "github.com/DSum001/sa-table/controller/employee"
    "github.com/DSum001/sa-table/middlewares"
	"github.com/DSum001/sa-table/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	
)

const PORT = "8000"

func main() {

	config.ConnectionDB()

   // Generate databases

	config.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

   // Auth Route

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

	}

	r.GET("/genders", genders.GetAll)


	r.GET("/", func(c *gin.Context) {

		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)

	})

	// Run the server

	r.Run("localhost:" + PORT)

	db, err := gorm.Open(sqlite.Open("sa-table.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(
		&entity.Booking{}, 
		&entity.Employee{}, 
		&entity.Member{}, 
		&entity.Package{}, 
		&entity.Soup{}, 
		&entity.Table{}, 
		&entity.TableStatus{},
		&entity.Point{},
		&entity.Category{}, 
		&entity.Coupon{}, 
		&entity.Gender{}, 
		&entity.Order{}, 
		&entity.Order_Product{}, 
		&entity.Position{}, 
		&entity.Product{},
		&entity.Rank{},
		&entity.Receipt{}, 
		&entity.Stock{}, 
		&entity.Supplier{})

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