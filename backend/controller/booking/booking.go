package booking

import (

	"net/http"

	"github.com/DSum001/sa-table/config"

	"github.com/DSum001/sa-table/entity"

	"github.com/gin-gonic/gin"

)


func GetAll(c *gin.Context) {

	db := config.DB()

	var booking []entity.Booking

	db.Find(&booking)

	c.JSON(http.StatusOK, &booking)

}