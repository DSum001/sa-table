package genders


import (

   "net/http"

   "github.com/DSum001/sa-table/config"

   "github.com/DSum001/sa-table/entity"

   "github.com/gin-gonic/gin"

)


func GetAll(c *gin.Context) {

   db := config.DB()

   var genders []entity.Gender

   db.Find(&genders)

   c.JSON(http.StatusOK, &genders)

}