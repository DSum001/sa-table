package entity

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Product_code_id   	string
	Product_name 		string	
	Category_id  		string	
	EmployeeID  		uint	
	Employee 			Employee 		`gorm:"foreignKey:EmployeeID"`

	Order_Product 		[]Order_Product `gorm:"foreignKey:product_id"`

}