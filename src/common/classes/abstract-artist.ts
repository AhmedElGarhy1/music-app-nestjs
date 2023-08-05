import { Gender } from "src/common/enums/gender.enum";
import { BaseEntity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ArtistEnum } from "../enums/artist-type.enum";

@Unique(['name'])
export abstract class AbstractArtist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    info: string;

    @Column()
    image: string

    @Column({
        type: "enum",
        enum: ArtistEnum,
        array: false
    })
    type: ArtistEnum

    @Column()
    gender: Gender

    @Column()
    nationality: string

}