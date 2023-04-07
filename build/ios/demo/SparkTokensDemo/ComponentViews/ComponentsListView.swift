//
//  ComponentsListView.swift
//  SparkTokensDemo
//
//

import Foundation
import SwiftUI

struct ComponentsListView: View {
    var body: some View {
        NavigationView {
            List() {
                NavigationLink(destination: ButtonsView()) {
                    Text("Buttons")
                }.listRowBackground(Color.brandPrimaryPrimaryContainer)
                NavigationLink(destination: BadgesView()) {
                    Text("Badges")
                }.listRowBackground(Color.brandPrimaryPrimaryContainer)
            }.navigationBarTitle("Components")
        }.navigationViewStyle(StackNavigationViewStyle())
        .background(Color.brandPrimaryPrimaryContainer)
    }
}
