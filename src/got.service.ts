import { computed, Injectable, signal } from '@angular/core';

/**
 * Tiré de https://gameofthronesquotes.xyz/
 */
@Injectable({
  providedIn: 'root' // Indique que le service est instanciable par la racine de l'application
})
export class GOTService {
  private readonly _houses = signal<readonly House<Member>[]>([]);
  readonly houses = computed<readonly House<Member>[]>( () => this._houses() );

  private readonly _selectedHouse = signal<undefined | House<MemberWithQuotes>>( undefined );
  readonly selectedHouse = computed<undefined | House<MemberWithQuotes>>( () => this._selectedHouse() );

  constructor() { 
    fetch("https://api.gameofthronesquotes.xyz/v1/houses").then( 
      R => R.json()
    ).then(
      L => this._houses.set( L as House<Member>[] )
    )
  }

  select(h: House<Member>) {
    Promise.all(
      h.members.map( 
        m => fetch(`https://api.gameofthronesquotes.xyz/v1/character/${m.slug}`).then( R => R.json() )
        .then( C => C[0] )
        .then( c => ({...m, quotes: c.quotes as string[]}) )
      )
    ).then( members => this._selectedHouse.set({...h, members}) )
  }

}


export interface House<T extends Member> {
  readonly name: string;
  readonly slug: string;
  readonly members: readonly T[];
}

export interface Member {
  readonly name: string;
  readonly slug: string;
}

export interface MemberWithQuotes extends Member {
  readonly quotes: readonly string[];
}
