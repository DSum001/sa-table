package soups

import (

	"net/http"
	"github.com/DSum001/sa-table/config"
	"github.com/DSum001/sa-table/entity"
	"github.com/gin-gonic/gin"

)

// GET /soups
func GetSoups(c *gin.Context) {

	var soups []entity.Soup
	db := config.DB()
	db.Find(&soups)
	c.JSON(http.StatusOK, &soups)
	
}