//
//  TokensView.swift
//  SparkTokensDemo
//
//

import Foundation
import SwiftUI

struct TokensView: View {
    var body: some View {
        NavigationView {
            List() {
                NavigationLink(destination: BackgroundColorView()) {
                    Text("Background Colors")
                }.listRowBackground(Color.brandPrimaryContainer)
                NavigationLink(destination: BorderView()) {
                    Text("Border Colors")
                }.listRowBackground(Color.brandPrimaryContainer)
                NavigationLink(destination: FontColorView()) {
                    Text("Font Colors")
                }.listRowBackground(Color.brandPrimaryContainer)
            }.navigationBarTitle("Tokens")
        }
        .navigationViewStyle(StackNavigationViewStyle())
    }
}
