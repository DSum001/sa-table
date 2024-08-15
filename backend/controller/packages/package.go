package packages

import (

	"net/http"

	"github.com/DSum001/sa-table/config"

	"github.com/DSum001/sa-table/entity"

	"github.com/gin-gonic/gin"

)


 func GetAll(c *gin.Context) {

	db := config.DB()

	var packages []entity.Package

	db.Find(&packages)

	c.JSON(http.StatusOK, &packages)

}