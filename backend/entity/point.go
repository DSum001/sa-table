package entity

import (

	"gorm.io/gorm"

)

type Point struct {

	gorm.Model
    PointID 	uint 			`json:"point_id"`
    Point      	string 			`json:"point"`

}