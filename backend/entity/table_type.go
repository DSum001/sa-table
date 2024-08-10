package entity

import (

    "time"
	"gorm.io/gorm"

)

type TableType struct {
	
    TableID     string          `gorm:"primarykey" json:"table_id"`
    TableType   int             `json:"table_type"`
    StatusID    []StatusTable   `gorm:"foreignKey:status_id"`

    CreatedAt 	time.Time
	UpdatedAt 	time.Time
	DeletedAt 	gorm.DeletedAt 	`gorm:"index"`

}