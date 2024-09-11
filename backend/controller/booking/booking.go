package booking

import (
    "net/http"
    "github.com/DSum001/sa-table/config"
    "github.com/DSum001/sa-table/entity"
    "github.com/gin-gonic/gin"
)

// โครงสร้างสำหรับรับค่าจาก request
type CreateBookingRequest struct {
    Booking entity.Booking `json:"booking"`
    SoupIDs []uint         `json:"soup_ids"`
}

// ฟังก์ชันสำหรับสร้าง booking ใหม่
func Create(c *gin.Context) {
    var req CreateBookingRequest
    db := config.DB()

    // bind request
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    booking := req.Booking
    soupIDs := req.SoupIDs

    // ค้นหา soups จาก soupIDs
    var soups []entity.Soup
    if err := db.Where("id IN ?", soupIDs).Find(&soups).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid soups"})
        return
    }

    // ค้นหา packages ด้วย id
    var packages entity.Package
    if err := db.First(&packages, booking.PackageID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Package not found"})
        return
    }

    // ค้นหา table ด้วย id
    var table entity.Table
    if err := db.First(&table, booking.TableID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Table not found"})
        return
    }

    // ค้นหา member ด้วย id
    var member entity.Member
    if err := db.First(&member, booking.MemberID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Member not found"})
        return
    }

    // ค้นหา employee ด้วย id
    var employee entity.Employee
    if err := db.First(&employee, booking.EmployeeID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Employee not found"})
        return
    }

    // สร้าง Booking และแนบ soups
    bk := entity.Booking{
        NumberOfCustomer: booking.NumberOfCustomer,
        PackageID:        booking.PackageID,
        Package:          packages,
        TableID:          booking.TableID,
        Table:            table,
        MemberID:         booking.MemberID,
        Member:           member,
        EmployeeID:       booking.EmployeeID,
        Employee:         employee,
        Soups:            soups, // แนบ soups ที่เลือกเข้ากับ booking
    }

    if err := db.Create(&bk).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusCreated, gin.H{"message": "Booking successful!"})
}

// ฟังก์ชันนี้จะดึงข้อมูล booking ทั้งหมดจากฐานข้อมูล
func GetAll(c *gin.Context) {
    var bookings []entity.Booking
    db := config.DB()

    // Preload ข้อมูล soups ผ่านตารางเชื่อม
    if err := db.Preload("Soups").Preload("Package").Preload("Table").Preload("Member").Preload("Employee").Find(&bookings).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, bookings)
}

// ฟังก์ชันนี้จะดึงข้อมูล booking ตาม ID
func Get(c *gin.Context) {
    ID := c.Param("id")
    var booking entity.Booking

    db := config.DB()
    if err := db.Preload("Soups").Preload("Package").Preload("Table").Preload("Member").Preload("Employee").First(&booking, ID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }
    if booking.ID == 0 {
        c.JSON(http.StatusNoContent, gin.H{})
        return
    }
    c.JSON(http.StatusOK, booking)
}

// ฟังก์ชันนี้จะอัพเดทข้อมูล booking ตาม ID
func Update(c *gin.Context) {
    var req CreateBookingRequest
    bookingID := c.Param("id")

    db := config.DB()
    var booking entity.Booking
    if err := db.First(&booking, bookingID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Booking ID not found"})
        return
    }

    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
        return
    }

    // ลบ soups เก่าที่มีอยู่ใน booking
    if err := db.Model(&booking).Association("Soups").Clear(); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    // ค้นหา soups ใหม่
    var soups []entity.Soup
    if err := db.Where("id IN ?", req.SoupIDs).Find(&soups).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid soups"})
        return
    }

    // อัพเดทข้อมูล booking และเพิ่ม soups ใหม่
    booking = req.Booking
    if err := db.Model(&booking).Association("Soups").Append(soups); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    if err := db.Save(&booking).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Update completed!"})
}

// ฟังก์ชันนี้จะลบข้อมูล booking ตาม ID
func Delete(c *gin.Context) {
    id := c.Param("id")
    db := config.DB()
    if tx := db.Exec("DELETE FROM booking WHERE id = ?", id); tx.RowsAffected == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "ID not found"})
        return
    }

    // ลบข้อมูลจากตารางเชื่อม booking_soups ด้วย
    if err := db.Exec("DELETE FROM booking_soups WHERE booking_id = ?", id).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Delete complete"})
}
