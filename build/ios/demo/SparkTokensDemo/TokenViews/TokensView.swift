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
                }.listRowBackground(Color.brandPrimaryPrimaryContainer)
                NavigationLink(destination: BorderView()) {
                    Text("Border Colors")
                }.listRowBackground(Color.brandPrimaryPrimaryContainer)
                NavigationLink(destination: FontColorView()) {
                    Text("Font Colors")
                }.listRowBackground(Color.brandPrimaryPrimaryContainer)
            }.navigationBarTitle("Tokens")
        }
        .navigationViewStyle(StackNavigationViewStyle())
    }
}
