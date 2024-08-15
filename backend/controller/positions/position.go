package positions

import (

	"net/http"

	"github.com/DSum001/sa-table/config"

	"github.com/DSum001/sa-table/entity"

	"github.com/gin-gonic/gin"

)


func GetAll(c *gin.Context) {

	db := config.DB()

	var position []entity.Position

	db.Find(&position)

	c.JSON(http.StatusOK, &position)

}