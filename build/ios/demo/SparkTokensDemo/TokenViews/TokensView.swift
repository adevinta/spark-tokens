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
                }.listRowBackground(Color.brandMainMainContainer)
                NavigationLink(destination: BorderView()) {
                    Text("Border Colors")
                }.listRowBackground(Color.brandMainMainContainer)
                NavigationLink(destination: FontColorView()) {
                    Text("Font Colors")
                }.listRowBackground(Color.brandMainMainContainer)
            }.navigationBarTitle("Tokens")
        }
        .navigationViewStyle(StackNavigationViewStyle())
    }
}
