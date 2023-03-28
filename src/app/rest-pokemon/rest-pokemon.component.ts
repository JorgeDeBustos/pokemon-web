import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-rest-pokemon',
  templateUrl: './rest-pokemon.component.html',
  styleUrls: ['./rest-pokemon.component.css'],
})
export class RestPokemonComponent implements OnInit {
  public offset: number = 0;
  public limit: number = 20;
  public pokemonArray: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.getPokemonForms();
  }

  getPokemonForms() {
    this.pokemonService
      .getPokemonForms(this.offset, this.limit)
      .subscribe((data) => {
        console.log('Pokemon ', data);
        this.parsePokemonListToArray(data);
      });
  }

  parsePokemonListToArray(pokemonForms) {
    pokemonForms.results.forEach((pokemonForm: any) => {
      this.pokemonService.getPokemon(pokemonForm.url).subscribe((data) => {
        this.pokemonArray.push(data);
      });
    });
    console.log('POK ARR ', this.pokemonArray);
  }
}
