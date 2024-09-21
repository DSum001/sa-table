package booking_soups

import (
    "net/http"
    "errors"
    "gorm.io/gorm"
    "github.com/DSum001/sa-table/config"
    "github.com/DSum001/sa-table/entity"
    "github.com/gin-gonic/gin"
)

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

    // Verify that Booking and Soup exist
    var booking entity.Booking
    if err := db.First(&booking, bookingSoup.BookingID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
        return
    }

    var soup entity.Soup
    if err := db.First(&soup, bookingSoup.SoupID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Soup not found"})
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


func UpdateBookingSoups(c *gin.Context) {
    var bookingSoupData []struct {
        BookingID uint `json:"BookingID"`
        SoupID    uint `json:"SoupID"`
    }

    // Bind the incoming JSON payload to the struct
    if err := c.ShouldBindJSON(&bookingSoupData); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input: " + err.Error()})
        return
    }

    db := config.DB()

    // Validate Booking ID and soup count
    if len(bookingSoupData) == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "At least one soup is required"})
        return
    }

    bookingID := bookingSoupData[0].BookingID
    if bookingID == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Booking ID is required"})
        return
    }

    if db == nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection failed"})
        return
    }

    // Check if the booking exists
    var booking entity.Booking
    if err := db.First(&booking, bookingID).Error; err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Error finding booking: " + err.Error()})
        }
        return
    }

    // Start a transaction
    tx := db.Begin()

    // Find all booking_soup records for the given bookingID
    var existingBookingSoups []entity.BookingSoup
    if err := tx.Where("booking_id = ?", bookingID).Find(&existingBookingSoups).Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Error finding existing booking-soup associations: " + err.Error()})
        return
    }

    // Check if the number of incoming soup data matches the number of existing booking_soups
    if len(bookingSoupData) != len(existingBookingSoups) {
        tx.Rollback()
        c.JSON(http.StatusBadRequest, gin.H{"error": "The number of soups does not match the existing records"})
        return
    }

    // Update each booking_soup with the new soup_id
    for i, soupData := range bookingSoupData {
        existingBookingSoups[i].SoupID = soupData.SoupID
        if err := tx.Save(&existingBookingSoups[i]).Error; err != nil {
            tx.Rollback()
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update soup association: " + err.Error()})
            return
        }
    }

    // Commit the transaction
    if err := tx.Commit().Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction: " + err.Error()})
        return
    }

    // Successful response
    c.JSON(http.StatusOK, gin.H{"message": "Booking-soup associations updated successfully"})
}
