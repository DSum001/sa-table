package booking

import (
    "net/http"
    "github.com/DSum001/sa-table/config"
    "github.com/DSum001/sa-table/entity"
    "github.com/gin-gonic/gin"
)

// ฟังก์ชันนี้จะดึงข้อมูล booking ทั้งหมดจากฐานข้อมูลและส่งกลับเป็น JSON
func GetAll(c *gin.Context) {
    db := config.DB()
    var bookings []entity.Booking
    db.Find(&bookings)
    c.JSON(http.StatusOK, bookings)  // ส่งข้อมูลทั้งหมดในรูปแบบ JSON
}

// ฟังก์ชันสำหรับสร้าง booking ใหม่
func CreateBooking(c *gin.Context) {
    db := config.DB()
    var booking entity.Booking

    // ตรวจสอบว่า request body สามารถ decode เป็น booking entity ได้หรือไม่
    if err := c.ShouldBindJSON(&booking); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // บันทึกข้อมูล booking ลงในฐานข้อมูล
    if err := db.Create(&booking).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, booking)  // ส่งข้อมูล booking กลับไป
}
