package member

import (

    "net/http"
    "github.com/gin-gonic/gin"
    "github.com/DSum001/sa-table/config"
    "github.com/DSum001/sa-table/entity"

)

func GetAll(c *gin.Context) {

    var member []entity.Member
    db := config.DB()
    results := db.Preload("Gender").Find(&member)

    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, member)

}

func Get(c *gin.Context) {

    ID := c.Param("id")
    var member entity.Member
    db := config.DB()
    results := db.Preload("Gender").First(&member, ID)

    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    if member.ID == 0 {
        c.JSON(http.StatusNoContent, gin.H{})
        return
    }

    c.JSON(http.StatusOK, member)

}

func Update(c *gin.Context) {

    var member entity.Member
    memberID := c.Param("id")
    db := config.DB()
    result := db.First(&member, memberID)

    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
        return
    }

    if err := c.ShouldBindJSON(&member); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
        return
    }

    result = db.Save(&member)

    if result.Error != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})

}

func Delete(c *gin.Context) {

    id := c.Param("id")
    db := config.DB()

    if tx := db.Exec("DELETE FROM member WHERE id = ?", id); tx.RowsAffected == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
        return

    }

    c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}