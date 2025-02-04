// src/models/AccessibilityResult.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class AccessibilityResult {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'float' })
  complianceScore!: number; // score between 0 to 100

  @Column('jsonb')
  issues!: Array<{ ruleName: string; description: string; suggestedFix: string }>;

  @CreateDateColumn()
  createdAt!: Date;
}
