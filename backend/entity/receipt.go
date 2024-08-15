package entity

import (

	"time"

	"gorm.io/gorm"
	
)

type Receipt struct {
	// Pk ของ Receipt เป็น uint ใช้คำสั่ง gorm.Model สร้าง Pk ให้ได้เลย
	gorm.Model
	
	Date 		time.Time	`json:"date"`

	Totalprice 	float64		`json:"totalprice"`

	// การเชื่่อม foreignkey จากตารางอื่น 
	CouponID *uint								// สร้างตัวแปรมารับ กำหนด type ให้ตรง
	
	Coupon Coupon `gorm:"foreignKey:CouponID"`		// ประกาศ file type และ foreignKey : Pk(ที่นำมาใช้)

	EmployeeID *string

	Employee Employee `gorm:"foreingKey:employee_id"`

	MemberID *string

	Member Member `gorm:"foreingKey:member_id"`
}