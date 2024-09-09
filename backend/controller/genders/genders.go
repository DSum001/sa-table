package genders

import (

    "net/http"
    "github.com/DSum001/sa-table/config"
    "github.com/DSum001/sa-table/entity"
    "github.com/gin-gonic/gin"

)

// GET /genders
func GetGenders(c *gin.Context) {

	var genders []entity.Gender
	db := config.DB()
	db.Find(&genders)
	c.JSON(http.StatusOK, &genders)
	
}