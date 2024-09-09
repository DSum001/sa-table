package entity

import (

	"gorm.io/gorm"

)

type Table struct {

	gorm.Model
    TableType       string          `json:"table_type"`
    Price           int             `json:"price"`
    TableStatusID   uint            `json:"table_status_id"`
    TableStatus     TableStatus     `gorm:"foreignKey:TableStatusID"`

}