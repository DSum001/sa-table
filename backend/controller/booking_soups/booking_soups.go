package booking_soups

import (
    "net/http"
    "github.com/DSum001/sa-table/config"
    "github.com/DSum001/sa-table/entity"
    "github.com/gin-gonic/gin"
)

// CreateBookingSoup handles the creation of a booking-soup association
func CreateBookingSoup(c *gin.Context) {
    var bookingSoup entity.BookingSoup

    // Bind JSON to the BookingSoup struct
    if err := c.ShouldBindJSON(&bookingSoup); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input: " + err.Error()})
        return
    }

    db := config.DB()
    if db == nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection failed"})
        return
    }

    // Create the booking-soup association
    if err := db.Create(&bookingSoup).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create booking-soup association: " + err.Error()})
        return
    }

    c.JSON(http.StatusCreated, gin.H{
        "message": "Booking-soup association created successfully",
        "id":      bookingSoup.ID,
    })
}
