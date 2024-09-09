package booking_soup

import (

	"net/http"
	"github.com/DSum001/sa-table/config"
	"github.com/DSum001/sa-table/entity"
	"github.com/gin-gonic/gin"

)

func GetAll(c *gin.Context) {

	db := config.DB()
	var bookingSoup []entity.BookingSoup
	db.Find(&bookingSoup)
	c.JSON(http.StatusOK, &bookingSoup)

}