package tables

import (

	"net/http"
	"github.com/DSum001/sa-table/config"
	"github.com/DSum001/sa-table/entity"
	"github.com/gin-gonic/gin"

)

func GetTables(c *gin.Context) {

	var tables []entity.Table
	db := config.DB()
	db.Find(&tables)
	c.JSON(http.StatusOK, &tables)
	
}