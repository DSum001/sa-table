package table_status

import (

	"net/http"
	"github.com/DSum001/sa-table/config"
	"github.com/DSum001/sa-table/entity"
	"github.com/gin-gonic/gin"

)

func GetTableStatus(c *gin.Context) {

	db := config.DB()
	var tableStatus []entity.TableStatus
	db.Find(&tableStatus)
	c.JSON(http.StatusOK, &tableStatus)

}