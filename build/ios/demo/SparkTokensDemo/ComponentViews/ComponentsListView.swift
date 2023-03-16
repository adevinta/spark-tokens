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
                }.listRowBackground(Color.brandPrimaryContainer)
                NavigationLink(destination: BadgesView()) {
                    Text("Badges")
                }.listRowBackground(Color.brandPrimaryContainer)
            }.navigationBarTitle("Components")
        }.navigationViewStyle(StackNavigationViewStyle())
        .background(Color.brandPrimaryContainer)
    }
}
