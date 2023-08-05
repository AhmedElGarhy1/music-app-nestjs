import { AbstractArtist } from "src/common/classes/abstract-artist";
import { Entity } from "typeorm";


@Entity('singers')
export class Singer extends AbstractArtist {

}