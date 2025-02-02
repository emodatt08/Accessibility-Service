import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAccessibilityTable1738357482118 implements MigrationInterface {
    name = 'CreateAccessibilityTable1738357482118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "accessibility_issue" ("id" SERIAL NOT NULL, "ruleName" character varying NOT NULL, "description" character varying NOT NULL, "suggestedFix" character varying NOT NULL, CONSTRAINT "PK_a88f64533fd37bb03f6c536c2c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accessibility_result" ("id" SERIAL NOT NULL, "complianceScore" double precision NOT NULL, "issues" jsonb NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_73e5665fb60b105a121045842bd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "accessibility_result"`);
        await queryRunner.query(`DROP TABLE "accessibility_issue"`);
    }

}
