package entity

import(
	"gorm.io/gorm"
) 

type Gender struct{
	gorm.Model
	Gender			string
			
	Employee 		[]Employee 		`gorm:"foreignKey:gender_id"`
}