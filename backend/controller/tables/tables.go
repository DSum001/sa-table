package tables

import (

	"net/http"

	"github.com/DSum001/sa-table/config"

	"github.com/DSum001/sa-table/entity"

	"github.com/gin-gonic/gin"

)


func GetAll(c *gin.Context) {

	db := config.DB()

	var tables []entity.Table

	db.Find(&tables)

	c.JSON(http.StatusOK, &tables)

}