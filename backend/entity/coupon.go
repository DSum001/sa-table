package entity

import (
	"gorm.io/gorm"
)

type Coupon struct {
	
	gorm.Model
	Code 				string 		`json:"code"`
	Discount_coupon 	int 		`json:"discount_coupon"`

	// Coupon เป็น 1 ต่อหลายกับ Receipt
	Receipt 			[]Receipt 	`gorm:"foreignKey:coupon_id"`

}