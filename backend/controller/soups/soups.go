package soups

import (

	"net/http"

	"github.com/DSum001/sa-table/config"

	"github.com/DSum001/sa-table/entity"

	"github.com/gin-gonic/gin"

)


func GetAll(c *gin.Context) {

	db := config.DB()

	var soups []entity.Soup

	db.Find(&soups)

	c.JSON(http.StatusOK, &soups)

}