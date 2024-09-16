package booking_soups

import (
    "net/http"
    "strconv"

    "github.com/DSum001/sa-table/config"
    "github.com/gin-gonic/gin"
    "github.com/DSum001/sa-table/entity"
)

// CreateBookingSoup handles the creation of booking-soup associations
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

    tx := db.Begin()
    if tx.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start transaction: " + tx.Error.Error()})
        return
    }

    // Ensure transaction rollback on panic
    defer func() {
        if r := recover(); r != nil {
            tx.Rollback()
            var errMsg string
            switch r := r.(type) {
            case string:
                errMsg = r
            default:
                errMsg = "Unknown error occurred"
            }
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Transaction failed: " + errMsg})
        }
    }()

    // Check if Booking exists
    var booking entity.Booking
    if err := tx.First(&booking, bookingSoup.BookingID).Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusNotFound, gin.H{"error": "Booking with ID " + strconv.Itoa(int(bookingSoup.BookingID)) + " not found"})
        return
    }

    // Check if Soup exists
    var soup entity.Soup
    if err := tx.First(&soup, bookingSoup.SoupID).Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusNotFound, gin.H{"error": "Soup with ID " + strconv.Itoa(int(bookingSoup.SoupID)) + " not found"})
        return
    }

    // Create the booking-soup association
    if err := tx.Create(&bookingSoup).Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create booking-soup association: " + err.Error()})
        return
    }

    // Commit the transaction
    if err := tx.Commit().Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Transaction commit failed: " + err.Error()})
        return
    }

    // Return a success response
    c.JSON(http.StatusCreated, gin.H{
        "message": "Booking-Soup association created successfully",
        "id":      bookingSoup.ID,
    })
}
