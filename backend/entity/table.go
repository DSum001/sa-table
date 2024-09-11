package entity

import "gorm.io/gorm"

type Table struct {
	gorm.Model
    TableName        string        `json:"table_name"`
    TableStatusID    uint          `json:"table_status_id"`
    TableStatus      TableStatus   `gorm:"foreignKey:TableStatusID"`
    
    // Relationship to TableCapacity (Many-to-One)
    TableCapacityID  uint          `json:"table_capacity_id"`
    TableCapacity    TableCapacity `gorm:"foreignKey:TableCapacityID"`
}