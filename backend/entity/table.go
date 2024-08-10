package entity

import (

	"gorm.io/gorm"

)

type TableType struct {

	gorm.Model
    TableID         string            `json:"table_id"`
    TableType       int               `json:"table_type"`
    TableStatusID    []TableStatus    `gorm:"foreignKey:table_status_id"`

}