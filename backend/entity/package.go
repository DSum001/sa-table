package entity

import (
	"gorm.io/gorm"
)

type Package struct {

	gorm.Model
	PackageID uint   `json:"package_id"`
	Name      string `json:"name"`
	Price     int    `json:"price"`

	PointID *uint `json:"point_id"`
	Point   Point `gorm:"foreignKey:PointID"`
	
}
