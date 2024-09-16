package tables

import (
    "net/http"
    "github.com/DSum001/sa-table/config"
    "github.com/DSum001/sa-table/entity"
    "github.com/gin-gonic/gin"
)

// GetAll function to fetch all tables with their status and capacity
func GetAll(c *gin.Context) {
    var tables []entity.Table
    db := config.DB()
    if db == nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection failed"})
        return
    }

    if err := db.Preload("TableStatus").Preload("TableCapacity").Find(&tables).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, &tables)
}
