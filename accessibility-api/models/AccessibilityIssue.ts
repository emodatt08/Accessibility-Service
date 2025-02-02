// src/models/AccessibilityIssue.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AccessibilityIssue {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ruleName!: string; // e.g., "Missing Alt Attribute", "Skipped Heading Levels"

  @Column()
  description!: string; // Description of the rule

  @Column()
  suggestedFix!: string; // Suggested fix for this rule violation
}
