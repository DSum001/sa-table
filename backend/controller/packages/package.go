package packages

import (

	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/DSum001/sa-table/config"
	"github.com/DSum001/sa-table/entity"

)

// GET /packages
func GetAll(c *gin.Context) {
	
	var packages []entity.Package
	db := config.DB()
	db.Find(&packages)
	c.JSON(http.StatusOK, &packages)

}