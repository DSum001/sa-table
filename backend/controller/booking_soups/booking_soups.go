package booking_soups

import (
    "net/http"
    "github.com/DSum001/sa-table/config"
    "github.com/gin-gonic/gin"
    "github.com/DSum001/sa-table/entity"
)

// CreateBookingSoup handles the creation of booking-soup associations
func Create(c *gin.Context) {
    var bookingSoup entity.BookingSoup

    if err := c.ShouldBindJSON(&bookingSoup); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    db := config.DB()
    tx := db.Begin()
    if tx.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start transaction"})
        return
    }

    // Check if Booking exists
    var booking entity.Booking
    if err := tx.First(&booking, bookingSoup.BookingID).Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
        return
    }

    // Check if Soup exists
    var soup entity.Soup
    if err := tx.First(&soup, bookingSoup.SoupID).Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusNotFound, gin.H{"error": "Soup not found"})
        return
    }

    // Create the booking-soup association
    if err := tx.Create(&bookingSoup).Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    tx.Commit()
    c.JSON(http.StatusCreated, gin.H{"message": "Booking-Soup association created successfully"})
}
