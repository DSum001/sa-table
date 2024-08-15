package entity

import(
	"gorm.io/gorm"
) 

type Rank struct{
	gorm.Model
	Rank 		string		
	Discount	float64	

	Member 		[]Member 		`gorm:"foreignKey:rank_id"`
}