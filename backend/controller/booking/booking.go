package booking

import (
    "fmt"
    "net/http"
    "strconv"
    "github.com/DSum001/sa-table/config"
    "github.com/DSum001/sa-table/entity"
    "github.com/gin-gonic/gin"
)

// Create creates a new booking entry
func Create(c *gin.Context) {
    var booking entity.Booking

    if err := c.ShouldBindJSON(&booking); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    db := config.DB()
    tx := db.Begin()
    if tx.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start transaction"})
        return
    }

    // Check if related entities exist
    var pkg entity.Package
    if err := tx.First(&pkg, booking.PackageID).Error; err != nil || pkg.ID == 0 {
        tx.Rollback()
        c.JSON(http.StatusNotFound, gin.H{"error": "Package not found"})
        return
    }
    
    var table entity.Table
    if err := tx.First(&table, booking.TableID).Error; err != nil || table.ID == 0 {
        tx.Rollback()
        c.JSON(http.StatusNotFound, gin.H{"error": "Table not found"})
        return
    }
    
    var employee entity.Employee
    if err := tx.First(&employee, booking.EmployeeID).Error; err != nil || employee.ID == 0 {
        tx.Rollback()
        c.JSON(http.StatusNotFound, gin.H{"error": "Employee not found"})
        return
    }
    
    for _, soupID := range booking.Soups {
        var soup entity.Soup
        if err := tx.First(&soup, soupID.ID).Error; err != nil {
            tx.Rollback()
            c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("Soup with ID %d not found", soupID.ID)})
            return
        }
    }
    
    // Create the booking entry
    bk := entity.Booking{
        NumberOfCustomer: booking.NumberOfCustomer,
        PackageID:        booking.PackageID,
        Package:          pkg,
        TableID:          booking.TableID,
        Table:            table,
        EmployeeID:       booking.EmployeeID,
        Employee:         employee,
    }
    
    if err := tx.Create(&bk).Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Create the booking-soup associations
    for _, soupID := range booking.Soups {
        bookingSoup := entity.BookingSoup{
            BookingID: bk.ID,
            SoupID:    soupID.ID,
        }
        if err := tx.Create(&bookingSoup).Error; err != nil {
            tx.Rollback()
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }
    }

    tx.Commit()
    c.JSON(http.StatusCreated, gin.H{"message": "Created successfully", "data": bk})
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

    booking.ID = uint(bookingID)
    booking.Soups = soupEntities
    booking.Package = pkg
    booking.Table = table
    booking.Employee = employee

    if err := db.Save(&booking).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update booking"})
        return
    }

    // Delete old booking-soups associations
    if err := db.Exec("DELETE FROM booking_soups WHERE booking_id = ?", booking.ID).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete old booking-soups associations"})
        return
    }

    // Create new booking-soup associations
    for _, soup := range soupEntities {
        bookingSoup := entity.BookingSoup{
            BookingID: booking.ID,
            SoupID:    soup.ID,
        }
        if err := db.Create(&bookingSoup).Error; err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }
    }

    c.JSON(http.StatusOK, gin.H{"message": "Update successful", "data": booking})
}

// Delete deletes a booking entry by ID
func Delete(c *gin.Context) {
    id := c.Param("id")
    db := config.DB()

    tx := db.Begin()
    if tx.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start transaction"})
        return
    }

    // Delete booking-soups associations
    if err := tx.Exec("DELETE FROM booking_soups WHERE booking_id = ?", id).Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete booking-soups associations"})
        return
    }

    // Delete booking entry
    if err := tx.Exec("DELETE FROM bookings WHERE id = ?", id).Error; err != nil {
        tx.Rollback()
        c.JSON(http.StatusNotFound, gin.H{"error": "ID not found in bookings"})
        return
    }

    tx.Commit()
    c.JSON(http.StatusOK, gin.H{"message": "Delete complete"})
}