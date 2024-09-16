package booking

import (
    "fmt"
    "net/http"
    "strconv"

    "github.com/DSum001/sa-table/config"
    "github.com/DSum001/sa-table/entity"
    "github.com/gin-gonic/gin"

)

// CreateBooking handles the creation of a booking
func Create(c *gin.Context) {
    var booking entity.Booking

    // Bind the JSON payload to the Booking struct
    if err := c.ShouldBindJSON(&booking); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input: " + err.Error()})
        return
    }

    db := config.DB()
    tx := db.Begin()
    if tx.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start transaction"})
        return
    }

    // Ensure transaction rollback in case of any errors
    defer func() {
        if r := recover(); r != nil {
            tx.Rollback()
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Transaction failed"})
        }
    }()

    // Create the booking
    if err := tx.Create(&booking).Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create booking: " + err.Error()})
        return
    }

    // Commit the transaction
    if err := tx.Commit().Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Transaction commit failed: " + err.Error()})
        return
    }

    // Return success response
    c.JSON(http.StatusCreated, gin.H{"message": "Booking created successfully"})
}

// GetAll retrieves all booking entries
func GetAll(c *gin.Context) {
    var bookings []entity.Booking
    db := config.DB()

    // Preload related data
    if err := db.Preload("Soups").Preload("Package").Preload("Table").Preload("Employee").Find(&bookings).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, bookings)
}

// Get retrieves a booking entry by ID
func Get(c *gin.Context) {
    ID := c.Param("id")
    var booking entity.Booking

    db := config.DB()
    if err := db.Preload("Soups").Preload("Package").Preload("Table").Preload("Employee").First(&booking, ID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }
    if booking.ID == 0 {
        c.JSON(http.StatusNoContent, gin.H{})
        return
    }
    c.JSON(http.StatusOK, booking)
}

// Update updates a booking entry by ID
func Update(c *gin.Context) {
    var booking entity.Booking
    bookingIDStr := c.Param("id")

    bookingID, err := strconv.ParseUint(bookingIDStr, 10, 32)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
        return
    }

    db := config.DB()
    if err := db.First(&booking, bookingID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "ID not found"})
        return
    }

    if err := c.ShouldBindJSON(&booking); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
        return
    }

    var soupEntities []entity.Soup
    for _, soupID := range booking.Soups {
        var existingSoup entity.Soup
        if err := db.First(&existingSoup, soupID.ID).Error; err != nil || existingSoup.ID == 0 {
            c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("Soup with ID %d not found", soupID.ID)})
            return
        }
        soupEntities = append(soupEntities, existingSoup)
    }

    var pkg entity.Package
    if err := db.First(&pkg, booking.PackageID).Error; err != nil || pkg.ID == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "Package not found"})
        return
    }

    var table entity.Table
    if err := db.First(&table, booking.TableID).Error; err != nil || table.ID == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "Table not found"})
        return
    }

    var employee entity.Employee
    if err := db.First(&employee, booking.EmployeeID).Error; err != nil || employee.ID == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "Employee not found"})
        return
    }

    tx := db.Begin()
    if tx.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start transaction"})
        return
    }

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

    // Delete old soups
    if err := tx.Where("booking_id = ?", booking.ID).Delete(&entity.BookingSoup{}).Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to clear soups"})
        return
    }

    // Add new soups
    for _, soupID := range booking.Soups {
        bookingSoup := entity.BookingSoup{
            BookingID: booking.ID,
            SoupID:    soupID.ID,
        }
        if err := tx.Create(&bookingSoup).Error; err != nil {
            tx.Rollback()
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create booking-soup association"})
            return
        }
    }

    // Commit Transaction
    if err := tx.Commit().Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Transaction commit failed"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Booking updated successfully"})
}

// Delete deletes a booking entry by ID
func Delete(c *gin.Context) {
    ID := c.Param("id")
    db := config.DB()

    var booking entity.Booking
    if err := db.First(&booking, ID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }

    tx := db.Begin()
    if tx.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start transaction"})
        return
    }

    if err := tx.Where("booking_id = ?", booking.ID).Delete(&entity.BookingSoup{}).Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete booking-soup associations"})
        return
    }

    if err := tx.Delete(&booking).Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    if err := tx.Commit().Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Transaction commit failed"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Booking deleted successfully"})
}
