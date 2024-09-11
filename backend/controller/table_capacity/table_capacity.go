package table_capacity

import (

	"net/http"
	"github.com/DSum001/sa-table/config"
	"github.com/DSum001/sa-table/entity"
	"github.com/gin-gonic/gin"

)

func GetTableCapacity(c *gin.Context) {

	db := config.DB()
	var tableCapacity []entity.TableCapacity
	db.Find(&tableCapacity)
	c.JSON(http.StatusOK, &tableCapacity)

}