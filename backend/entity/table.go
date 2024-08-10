package entity

import (

	"gorm.io/gorm"

)

type Table struct {

	gorm.Model
    TableID         uint            `json:"table_id"`
    TableType       int             `json:"table_type"`
    Price           int             `json:"price"`
    TableStatusID    []TableStatus  `gorm:"foreignKey:table_status_id"`

}