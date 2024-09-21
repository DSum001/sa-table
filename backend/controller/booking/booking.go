package booking

import (
    "fmt"
    "net/http"
    "strconv"
    "time"
    "github.com/DSum001/sa-table/config"
    "github.com/DSum001/sa-table/entity"
    "github.com/gin-gonic/gin"
)

// CreateBooking
func CreateBooking(c *gin.Context) {
    var booking entity.Booking

    // Bind JSON to the Booking struct
    if err := c.ShouldBindJSON(&booking); err != nil {
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
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start transaction"})
        return
    }

    defer func() {
        if r := recover(); r != nil {
            tx.Rollback()
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Transaction failed: " + fmt.Sprintf("%v", r)})
        }
    }()

    // Create the booking
    if err := tx.Create(&booking).Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create booking: " + err.Error()})
        return
    }

    if err := tx.Commit().Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Transaction commit failed: " + err.Error()})
        return
    }

    c.JSON(http.StatusCreated, gin.H{
        "message":    "Booking created successfully",
        "booking_id": booking.ID,
    })
}

// GetAll Booking
func GetAll(c *gin.Context) {
    var bookings []entity.Booking
    db := config.DB()

    if db == nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection failed"})
        return
    }

    if err := db.Preload("Package").Preload("Table").Preload("Employee").Preload("Soups").Find(&bookings).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, bookings)
}

func GetByID(c *gin.Context) {
    ID := c.Param("id")
    var booking entity.Booking

    db := config.DB()
    if db == nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection failed"})
        return
    }

    // ตรวจสอบให้แน่ใจว่า ID เป็นตัวเลข
    if _, err := strconv.Atoi(ID); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid booking ID"})
        return
    }

    // Preload related data including Soups
    if err := db.Preload("Package").
        Preload("Table").
        Preload("Employee").
        Preload("Soups"). 
        First(&booking, ID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }

    if booking.ID == 0 {
        c.JSON(http.StatusNoContent, gin.H{})
        return
    }
    c.JSON(http.StatusOK, booking)
}

func UpdateBooking(c *gin.Context) {
    var booking entity.Booking
    bookingIDStr := c.Param("id")

    bookingID, err := strconv.ParseUint(bookingIDStr, 10, 32)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
        return
    }

    db := config.DB()
    if db == nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection failed"})
        return
    }

    if err := db.First(&booking, bookingID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "ID not found"})
        return
    }

    // Bind JSON to the Booking struct
    if err := c.ShouldBindJSON(&booking); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
        return
    }

    var pkg entity.Package
    if err := db.First(&pkg, booking.PackageID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Package not found"})
        return
    }

    var table entity.Table
    if err := db.First(&table, booking.TableID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Table not found"})
        return
    }

    var employee entity.Employee
    if err := db.First(&employee, booking.EmployeeID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Employee not found"})
        return
    }

    tx := db.Begin()
    if tx.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start transaction"})
        return
    }

    defer func() {
        if r := recover(); r != nil {
            tx.Rollback()
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Transaction failed: " + fmt.Sprintf("%v", r)})
        }
    }()

    // Update booking
    if err := tx.Model(&booking).Updates(entity.Booking{
        NumberOfCustomer: booking.NumberOfCustomer,
        PackageID:        booking.PackageID,
        TableID:          booking.TableID,
        EmployeeID:       booking.EmployeeID,
    }).Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update booking"})
        return
    }

    // Commit Transaction
    if err := tx.Commit().Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Transaction commit failed"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Booking updated successfully"})
}

// DeleteBooking
func DeleteBooking(c *gin.Context) {
    ID := c.Param("id")
    db := config.DB()

    if db == nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection failed"})
        return
    }

    var booking entity.Booking
    if err := db.First(&booking, ID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
        return
    }

    tx := db.Begin()
    if tx.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start transaction"})
        return
    }

    defer func() {
        if r := recover(); r != nil {
            tx.Rollback()
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Transaction failed: " + fmt.Sprintf("%v", r)})
        }
    }()

    // Delete BookingSoup
    if err := tx.Where("booking_id = ?", booking.ID).Delete(&entity.BookingSoup{}).Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete booking-soup associations: " + err.Error()})
        return
    }

    // Soft delete booking
    if err := tx.Model(&booking).Update("deleted_at", time.Now()).Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    var table entity.Table
    if err := tx.First(&table, booking.TableID).Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to find table associated with booking"})
        return
    }

    // Update the table status to available
    table.TableStatusID = 1
    if err := tx.Save(&table).Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update table status"})
        return
    }

    // Commit Transaction
    if err := tx.Commit().Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Transaction commit failed"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Booking deleted and table status updated to available successfully"})
}